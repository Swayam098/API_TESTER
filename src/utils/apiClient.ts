import axios from 'axios';

export async function sendApiRequest(
  method: string,
  url: string,
  headers: Record<string, string>,
  body: any
) {
  try {
    const response = await axios({
      method,
      url,
      headers,
      data: body,
    });

    return {
      success: true,
      data: response.data,
      status: response.status,
      headers: response.headers,
    };
  } catch (error: any) {
    return {
      success: false,
      data: error?.response?.data || error.message,
      status: error?.response?.status || 500,
    };
  }
}
