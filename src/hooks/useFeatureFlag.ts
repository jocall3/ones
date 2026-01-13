import { useState, useEffect } from 'react';

interface FeatureFlags {
  [key: string]: boolean;
}

const useFeatureFlag = (featureName: string): boolean => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    // In a real application, this would likely fetch feature flags from
    // a remote source (e.g., a configuration service) or local storage.
    // For this example, we'll use a hardcoded set of flags.

    const featureFlags: FeatureFlags = {
      // Example feature flags:
      newDashboard: true,
      aiPoweredInsights: false,
      enhancedSecurity: true,
      // Add more feature flags here as needed
    };

    // Check if the requested feature is present in the flags and enabled.
    if (featureFlags.hasOwnProperty(featureName)) {
      setIsEnabled(featureFlags[featureName]);
    } else {
      // If the feature flag is not defined, default to disabled.
      setIsEnabled(false);
      console.warn(`Feature flag "${featureName}" not found. Defaulting to disabled.`);
    }
  }, [featureName]);

  return isEnabled;
};

export default useFeatureFlag;