export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

const DEFAULT_N8N_WEBHOOK_URL = 'https://varshini18.app.n8n.cloud/webhook/50b00470-060a-447c-b5f6-cad7549169ba/chat';
const STORAGE_KEY_N8N_URL = 'examvault_n8n_url';

export function getWebhookUrl(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_N8N_URL) || DEFAULT_N8N_WEBHOOK_URL;
  } catch {
    return DEFAULT_N8N_WEBHOOK_URL;
  }
}

export function setWebhookUrl(url: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_N8N_URL, url.trim());
  } catch (e) {
    console.error('Failed saving n8n URL to localStorage', e);
  }
}

export async function sendMessageToN8N(
  message: string,
  sessionId: string,
  extraContext?: { currentCategory?: string; activeYear?: number | null }
): Promise<string> {
  const url = getWebhookUrl();
  try {
    const payload = {
      message: message.trim(),
      chatInput: message.trim(), // standard n8n chat trigger field
      sessionId: sessionId,
      action: 'sendMessage',
      context: {
        category: extraContext?.currentCategory || 'All Exams',
        year: extraContext?.activeYear || 'All Years',
        source: 'ExamVault Government Exam Portal',
      },
    };

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
      });
    } catch (networkErr: any) {
      // If CORS or mixed content or network blocked, attempt direct with mode: 'cors'
      throw new Error(`Connection to n8n failed: ${networkErr.message || 'Network blocked'}. Ensure CORS is allowed in n8n or workflow is running.`);
    }

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          `n8n returned 404 Not Found. Please activate the workflow toggle in n8n Cloud (top right switch), or if you are testing the workflow, use the Test URL '/webhook-test/...' via the settings ⚙️ icon.`
        );
      }
      throw new Error(`n8n webhook responded with status ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (typeof data === 'string') return data;
      if (data.output) return typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
      if (data.text) return data.text;
      if (data.message) return data.message;
      if (data.response) return data.response;
      if (data.reply) return data.reply;
      if (Array.isArray(data) && data.length > 0) {
        const first = data[0];
        if (typeof first === 'string') return first;
        if (first.output) return first.output;
        if (first.text) return first.text;
        if (first.message) return first.message;
        return JSON.stringify(first);
      }
      return JSON.stringify(data);
    } else {
      const text = await response.text();
      return text || 'Response received from exam assistant.';
    }
  } catch (error: any) {
    console.error('Error connecting to n8n webhook:', error);
    throw new Error(
      error?.message || 'Could not reach the exam assistant webhook. Please check network connection or webhook settings.'
    );
  }
}
