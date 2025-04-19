export const generateAISummary = async (
  text: string
): Promise<string | null> => {
  const apiKey = import.meta.env.VITE_APYHUB_API_KEY;

  if (!apiKey) {
    console.error(
      'API Key de ApyHub no encontrada en las variables de entorno'
    );
    return null;
  }

  try {
    const response = await fetch('https://api.apyhub.com/ai/summarize-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apy-token': apiKey,
      },
      body: JSON.stringify({
        text,
        summary_length: 'short', // Opciones: 'short', 'medium', 'long'
        output_language: 'es', // Idioma del resumen
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error en la respuesta de ApyHub:', data);
      return null;
    }

    return data.data?.summary ?? null;
  } catch (error) {
    console.error('Error al generar resumen:', error);
    return null;
  }
};
