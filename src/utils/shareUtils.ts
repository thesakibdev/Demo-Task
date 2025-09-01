import type { HeadlineSettings } from '../store';

export function generateShareableURL(settings: HeadlineSettings): string {
  try {
    const encodedSettings = btoa(JSON.stringify(settings));
    const baseURL = window.location.origin + window.location.pathname;
    return `${baseURL}?settings=${encodedSettings}`;
  } catch (error) {
    console.error('Failed to generate shareable URL:', error);
    return window.location.href;
  }
}

export function loadSettingsFromURL(): HeadlineSettings | null {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedSettings = urlParams.get('settings');
    
    if (!encodedSettings) {
      return null;
    }

    const decodedSettings = atob(encodedSettings);
    return JSON.parse(decodedSettings);
  } catch (error) {
    console.error('Failed to load settings from URL:', error);
    return null;
  }
}

export function copyShareableURL(settings: HeadlineSettings): Promise<void> {
  const shareableURL = generateShareableURL(settings);
  
  return navigator.clipboard.writeText(shareableURL).then(() => {
    console.log('Shareable URL copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy shareable URL:', err);
    // Fallback: try to copy using a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = shareableURL;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  });
}

export function shareViaWebAPI(settings: HeadlineSettings): Promise<void> {
  const shareableURL = generateShareableURL(settings);
  
  if (navigator.share) {
    return navigator.share({
      title: 'Check out this headline!',
      text: `I created "${settings.text}" using the Headline Editor`,
      url: shareableURL,
    });
  } else {
    // Fallback to clipboard copy
    return copyShareableURL(settings);
  }
}

export function clearURLSettings(): void {
  const url = new URL(window.location.href);
  url.searchParams.delete('settings');
  window.history.replaceState({}, '', url.toString());
}
