export function trackAppointmentBookingConversion(url) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    if (url) window.location.href = url;
    return;
  }

  const callback = function () {
    if (url) {
      window.location.href = url;
    }
  };

  window.gtag('event', 'conversion', {
    send_to: 'AW-11413798917/GaMJCP_rx5EcEIWAw8Iq',
    event_callback: callback,
  });
}