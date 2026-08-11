const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Send chat message to Datezo FastAPI backend (which communicates securely with Gemini API)
 */
export async function sendChatMessage({ message, conversation = [], prediction_context = null }) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversation,
        prediction_context,
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to send chat message:', error);
    return {
      success: false,
      message: 'Datezo AI is temporarily unavailable. Please try again.',
      model: 'gemini-2.5-flash',
    };
  }
}

/**
 * Fetch system health including Gemini service status
 */
export async function checkChatHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/health`);
    if (!response.ok) return { healthy: false, gemini: 'unavailable' };
    const data = await response.json();
    return {
      healthy: data.status === 'healthy',
      gemini: data.gemini_service || 'not_configured',
    };
  } catch {
    return { healthy: false, gemini: 'unavailable' };
  }
}
