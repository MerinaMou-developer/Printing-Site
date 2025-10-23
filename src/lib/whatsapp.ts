// Utility function to create WhatsApp links
export function createWhatsAppLink(phoneNumber: string, message?: string): string {
  // Remove all non-digit characters except +
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
  
  // Remove + if present and ensure it starts with country code
  const numberWithoutPlus = cleanNumber.replace(/^\+/, '');
  
  // Create WhatsApp link
  const baseUrl = `https://wa.me/${numberWithoutPlus}`;
  
  if (message) {
    const encodedMessage = encodeURIComponent(message);
    return `${baseUrl}?text=${encodedMessage}`;
  }
  
  return baseUrl;
}

// Utility function to create phone links
export function createPhoneLink(phoneNumber: string): string {
  // Remove all non-digit characters except +
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
  return `tel:${cleanNumber}`;
}

// Utility function to format phone number for display
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters except +
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
  
  // If it starts with +971, format as UAE number
  if (cleanNumber.startsWith('+971')) {
    const number = cleanNumber.substring(4);
    if (number.length === 9) {
      return `+971 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5)}`;
    }
  }
  
  // Default formatting - return the clean number with + if it doesn't have one
  return cleanNumber.startsWith('+') ? cleanNumber : `+${cleanNumber}`;
}
