// Image Share Generation for Social Media

export interface ShareImageData {
  homeTeam: string;
  awayTeam: string;
  predictedHomeGoals: number;
  predictedAwayGoals: number;
  confidence: number;
  competition: string;
}

/**
 * Generates a shareable image (9:16 format for Instagram/TikTok/WhatsApp)
 * Using Canvas API for instant generation
 */
export async function generateShareImage(data: ShareImageData): Promise<Blob> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Canvas context not available');

  // 9:16 ratio at high quality (1080x1920 for Instagram)
  canvas.width = 1080;
  canvas.height = 1920;

  // Background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Top gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, '#34D399');
  gradient.addColorStop(1, 'rgba(52, 211, 153, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, 300);

  // Header text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 60px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('APEX', canvas.width / 2, 100);

  ctx.font = '30px Inter, sans-serif';
  ctx.fillStyle = '#9CA3AF';
  ctx.fillText('Prédiction', canvas.width / 2, 160);

  // Competition
  ctx.font = 'bold 36px Inter, sans-serif';
  ctx.fillStyle = '#E5E7EB';
  ctx.fillText(data.competition, canvas.width / 2, 250);

  // Main score prediction
  ctx.font = 'bold 120px Inter, sans-serif';
  ctx.fillStyle = '#34D399';
  ctx.textAlign = 'center';
  
  const scoreText = `${Math.round(data.predictedHomeGoals)} - ${Math.round(data.predictedAwayGoals)}`;
  ctx.fillText(scoreText, canvas.width / 2, 700);

  // Teams
  ctx.font = 'bold 56px Inter, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.fillText(data.homeTeam, 80, 850);
  
  ctx.textAlign = 'right';
  ctx.fillText(data.awayTeam, canvas.width - 80, 850);

  // VS
  ctx.textAlign = 'center';
  ctx.font = 'bold 40px Inter, sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText('vs', canvas.width / 2, 850);

  // Confidence badge
  const badgeX = canvas.width / 2;
  const badgeY = 1050;
  const badgeWidth = 300;
  const badgeHeight = 100;
  
  // Badge background
  ctx.fillStyle = '#0f1115';
  ctx.fillRect(badgeX - badgeWidth / 2, badgeY - badgeHeight / 2, badgeWidth, badgeHeight);
  
  // Badge border
  ctx.strokeStyle = '#34D399';
  ctx.lineWidth = 3;
  ctx.strokeRect(badgeX - badgeWidth / 2, badgeY - badgeHeight / 2, badgeWidth, badgeHeight);

  // Confidence text
  ctx.fillStyle = '#34D399';
  ctx.font = 'bold 48px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${Math.round(data.confidence)}%`, badgeX, badgeY + 20);

  ctx.fillStyle = '#9CA3AF';
  ctx.font = '28px Inter, sans-serif';
  ctx.fillText('Confiance', badgeX, badgeY + 60);

  // Footer
  ctx.fillStyle = '#6B7280';
  ctx.font = '24px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Télécharge APEX pour plus d\'analyses', canvas.width / 2, 1600);

  // QR code area (placeholder)
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(canvas.width / 2 - 150, 1700, 300, 150);
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '20px Inter, sans-serif';
  ctx.fillText('APEX.app', canvas.width / 2, 1800);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Canvas to blob failed'));
    }, 'image/png', 0.95);
  });
}

/**
 * Download image to user's device
 */
export async function downloadShareImage(
  data: ShareImageData,
  filename: string = 'apex-prediction.png'
) {
  const blob = await generateShareImage(data);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Share image via Web Share API (native share)
 */
export async function shareImage(
  data: ShareImageData,
  title: string = 'Prédiction Apex'
) {
  if (!navigator.share) {
    // Fallback to download
    return downloadShareImage(data);
  }

  const blob = await generateShareImage(data);
  const file = new File([blob], 'apex-prediction.png', { type: 'image/png' });

  try {
    await navigator.share({
      files: [file],
      title,
      text: `${data.homeTeam} vs ${data.awayTeam}: ${Math.round(data.predictedHomeGoals)}-${Math.round(data.predictedAwayGoals)} (${data.confidence}% confiance)`,
    });
  } catch (error) {
    console.log('Share cancelled or failed:', error);
  }
}

/**
 * Copy image to clipboard
 */
export async function copyImageToClipboard(data: ShareImageData) {
  try {
    const blob = await generateShareImage(data);
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob,
      }),
    ]);
    return true;
  } catch (error) {
    console.error('Copy to clipboard failed:', error);
    return false;
  }
}
