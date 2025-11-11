/**
 * Photo Extraction Service
 *
 * Uses Claude Vision API to extract product information from photos.
 * Can extract: barcode numbers, product names, brands, and ingredients lists.
 *
 * @module lib/photoExtraction
 */

/**
 * Extracts product information from a photo using Claude Vision API
 *
 * @param {string} imageBase64 - Base64-encoded image data (without data URL prefix)
 * @returns {Promise<Object>} Extraction results
 *
 * Success response structure:
 * {
 *   success: true,
 *   barcode: string | null,
 *   productName: string | null,
 *   brand: string | null,
 *   ingredients: string | null,
 *   confidence: 'high' | 'medium' | 'low',
 *   notes: string
 * }
 */
export async function extractProductFromPhoto(imageBase64, mediaType = null) {
  // Auto-detect media type from base64 data if not provided
  let detectedMediaType = mediaType;
  if (!detectedMediaType) {
    // Check the base64 signature to detect image type
    const firstBytes = imageBase64.substring(0, 10);
    if (firstBytes.startsWith('/9j/')) {
      detectedMediaType = 'image/jpeg';
    } else if (firstBytes.startsWith('iVBOR')) {
      detectedMediaType = 'image/png';
    } else if (firstBytes.startsWith('R0lGO')) {
      detectedMediaType = 'image/gif';
    } else if (firstBytes.startsWith('UklGR')) {
      detectedMediaType = 'image/webp';
    } else {
      // Default to JPEG if can't detect
      detectedMediaType = 'image/jpeg';
    }
  }

  console.log('Detected media type:', detectedMediaType);

  const prompt = `Analyze this baby food product photo and extract ALL available information.

Look carefully for:
1. **Barcode/UPC**: Usually on the back or bottom (12-13 digit number under barcode lines)
   - Look for patterns like: 0 12345 67890 1 or similar
   - The barcode is the NUMBERS below the black and white bars
   - May start with 0, 1, 2, 3, 4, 5, 6, 7, 8, or 9

2. **Product name**: The main product title on the front
   - Usually the largest text on the package
   - Examples: "Organic Sweet Potato Puree", "First Foods Banana", etc.

3. **Brand name**: The manufacturer name
   - Common brands: Gerber, Beech-Nut, Happy Baby, Earth's Best, Plum Organics, etc.
   - Usually at the top of the package

4. **Ingredients list**: Usually on the back or side panel
   - Look for "INGREDIENTS:" label
   - Capture the COMPLETE list with all ingredients

CRITICAL INSTRUCTIONS:
- If you can see a barcode NUMBER (digits), extract the COMPLETE number (all 12-13 digits)
- DO NOT make up barcode numbers - only extract if clearly visible
- If the image quality is poor or text is unclear, say "unclear" rather than guessing
- For ingredients, capture the COMPLETE list if visible
- If multiple sides of the product are shown, extract from all visible text
- Pay special attention to organic certifications, age recommendations, serving information

Return ONLY valid JSON (no markdown, no code blocks, no explanatory text):

{
  "barcode": "12 or 13 digit number or null if not found",
  "productName": "extracted product name or null",
  "brand": "extracted brand name or null",
  "ingredients": "complete ingredients list or null",
  "confidence": "high|medium|low",
  "notes": "any relevant observations (e.g., 'barcode partially obscured', 'organic certification visible', 'Stage 1 baby food')"
}`;

  try {
    console.log('Extracting product information from photo...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1500,
        temperature: 0.1, // Low temperature for accuracy
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: detectedMediaType,
                data: imageBase64
              }
            },
            {
              type: 'text',
              text: prompt
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Claude API error:', errorData);
      throw new Error(`Claude API error: ${response.status} ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const extractedText = data.content[0].text.trim();

    console.log('Raw AI response:', extractedText);

    // Remove markdown code blocks if present
    let jsonText = extractedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    // Parse JSON
    const extraction = JSON.parse(jsonText);

    // Validate extraction structure
    if (!extraction || typeof extraction !== 'object') {
      throw new Error('Invalid extraction format from AI');
    }

    // Clean up barcode (remove spaces and dashes)
    if (extraction.barcode) {
      extraction.barcode = extraction.barcode.replace(/[\s-]/g, '');
    }

    console.log('✓ Extraction successful:', {
      barcode: extraction.barcode,
      productName: extraction.productName,
      brand: extraction.brand,
      hasIngredients: !!extraction.ingredients,
      confidence: extraction.confidence
    });

    return {
      success: true,
      ...extraction
    };

  } catch (error) {
    console.error('Photo extraction failed:', error.message);
    return {
      success: false,
      error: error.message,
      barcode: null,
      productName: null,
      brand: null,
      ingredients: null,
      confidence: 'low',
      notes: 'Extraction failed'
    };
  }
}

/**
 * Converts a File object to base64 string
 *
 * @param {File} file - Image file
 * @returns {Promise<string>} Base64-encoded image (without data URL prefix)
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Validates if a string is a valid UPC/EAN barcode
 *
 * @param {string} barcode - Barcode to validate
 * @returns {boolean} True if valid barcode format
 */
export function isValidBarcode(barcode) {
  if (!barcode) return false;

  // Remove any spaces or dashes
  const cleaned = barcode.replace(/[\s-]/g, '');

  // Check if it's a valid length (8, 12, 13, or 14 digits) and only contains digits
  if (!/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/.test(cleaned)) {
    return false;
  }

  return true;
}

/**
 * Compresses an image to reduce file size before sending to API
 *
 * @param {string} dataUrl - Image data URL
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} quality - JPEG quality (0-1)
 * @returns {Promise<string>} Compressed image data URL
 */
export function compressImage(dataUrl, maxWidth = 1920, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions maintaining aspect ratio
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to JPEG with specified quality
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };

    img.onerror = reject;
    img.src = dataUrl;
  });
}

/**
 * Formats a barcode for display (adds hyphens for readability)
 *
 * @param {string} barcode - Raw barcode number
 * @returns {string} Formatted barcode
 */
export function formatBarcodeForDisplay(barcode) {
  if (!barcode) return '';

  const clean = barcode.replace(/[^0-9]/g, '');

  // Format UPC-A (12 digits): 0-12345-67890-1
  if (clean.length === 12) {
    return `${clean[0]}-${clean.slice(1, 6)}-${clean.slice(6, 11)}-${clean[11]}`;
  }

  // Format EAN-13 (13 digits): 123-4567890123
  if (clean.length === 13) {
    return `${clean.slice(0, 3)}-${clean.slice(3)}`;
  }

  // Return as-is for other lengths
  return clean;
}
