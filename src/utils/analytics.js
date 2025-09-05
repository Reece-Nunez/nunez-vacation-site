// Analytics tracking for Airbnb clicks and user behavior
export const trackAirbnbClick = (propertyName, buttonLocation = 'property-page') => {
  // Google Analytics 4 event tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'airbnb_click', {
      event_category: 'booking',
      event_label: propertyName,
      button_location: buttonLocation,
      property_name: propertyName,
      destination: 'airbnb'
    });
  }

  // Facebook Pixel tracking
  if (typeof fbq !== 'undefined') {
    fbq('track', 'InitiateCheckout', {
      content_name: propertyName,
      content_category: 'vacation_rental',
      source: 'website',
      destination: 'airbnb'
    });
  }

  // Custom analytics for business insights
  const clickData = {
    timestamp: new Date().toISOString(),
    property: propertyName,
    location: buttonLocation,
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    url: window.location.href
  };

  // Send to your analytics endpoint
  fetch('/api/analytics/airbnb-clicks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clickData)
  }).catch(err => console.log('Analytics error:', err));

  console.log('Airbnb click tracked:', clickData);
};

export const trackPageView = (pageName, propertyName = null) => {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageName,
      page_location: window.location.href,
      custom_map: {
        property_name: propertyName
      }
    });
  }
};