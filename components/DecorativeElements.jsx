// Decorative organic shapes and illustrations for playful design aesthetic

export function BlobShape({ className = '', color = 'primary' }) {
  const colorMap = {
    primary: 'fill-primary-200',
    coral: 'fill-coral-200',
    butter: 'fill-butter-200',
    lavender: 'fill-lavender-200',
  };

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        className={colorMap[color] || colorMap.primary}
        d="M47.1,-57.7C59.9,-49.1,68.4,-33.3,71.2,-16.2C74,0.9,71.1,19.3,62.6,34.2C54.1,49.1,40,60.5,24.1,65.4C8.2,70.3,-9.5,68.7,-25.5,62.8C-41.5,56.9,-55.8,46.7,-63.7,32.8C-71.6,18.9,-73.1,1.3,-69.3,-14.8C-65.5,-30.9,-56.4,-45.5,-43.6,-54.1C-30.8,-62.7,-15.4,-65.3,0.8,-66.3C17,-67.3,34.3,-66.3,47.1,-57.7Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function CircleDecoration({ className = '', color = 'primary' }) {
  const colorMap = {
    primary: 'bg-primary-200',
    coral: 'bg-coral-200',
    butter: 'bg-butter-200',
    lavender: 'bg-lavender-200',
  };

  return (
    <div
      className={`${colorMap[color]} rounded-full ${className}`}
      aria-hidden="true"
    />
  );
}

export function WaveDecoration({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full ${flip ? 'rotate-180' : ''} ${className}`}
      preserveAspectRatio="none"
    >
      <path
        fill="currentColor"
        fillOpacity="1"
        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,96C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
  );
}

export function FruitIllustration({ type = 'apple', className = '' }) {
  const illustrations = {
    apple: (
      <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="55" r="35" fill="#FF6B6B" />
        <ellipse cx="50" cy="55" rx="28" ry="32" fill="#FF8787" />
        <path
          d="M45 30 Q48 20, 51 30"
          fill="none"
          stroke="#8B4513"
          strokeWidth="3"
        />
        <ellipse cx="47" cy="40" rx="6" ry="8" fill="white" opacity="0.4" />
      </svg>
    ),
    carrot: (
      <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 20 L40 90 L60 90 Z"
          fill="#FF8B3D"
          stroke="#E67A2E"
          strokeWidth="2"
        />
        <path d="M45 25 L47 20 L50 15" fill="none" stroke="#4CAF50" strokeWidth="2" />
        <path d="M50 25 L52 18 L55 12" fill="none" stroke="#4CAF50" strokeWidth="2" />
        <path d="M55 25 L57 20 L60 15" fill="none" stroke="#4CAF50" strokeWidth="2" />
      </svg>
    ),
    banana: (
      <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 40 Q20 50, 25 65 Q30 80, 45 85 Q60 90, 70 80 Q75 70, 72 60 Q70 45, 65 35 Q60 25, 50 25 Q40 25, 35 35 Q32 38, 30 40"
          fill="#FFE135"
          stroke="#FFD700"
          strokeWidth="2"
        />
        <path d="M35 40 Q40 45, 45 48" fill="none" stroke="#E6C72E" strokeWidth="1" />
      </svg>
    ),
    pear: (
      <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="50" cy="65" rx="22" ry="28" fill="#B8E986" />
        <circle cx="50" cy="35" r="15" fill="#B8E986" />
        <path
          d="M47 25 Q48 18, 50 25"
          fill="none"
          stroke="#8B6F47"
          strokeWidth="2"
        />
      </svg>
    ),
    orange: (
      <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="30" fill="#FF9500" />
        <circle cx="50" cy="50" r="25" fill="#FFA500" />
        <circle cx="45" cy="42" r="8" fill="white" opacity="0.3" />
        <path d="M50 25 L50 20" stroke="#4CAF50" strokeWidth="2" />
      </svg>
    ),
  };

  return illustrations[type] || illustrations.apple;
}

export function LeafDecoration({ className = '', variant = 1 }) {
  if (variant === 1) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 80 Q50 20, 80 80 Q50 60, 20 80"
          fill="#4CAF50"
          opacity="0.8"
        />
        <path
          d="M20 80 Q50 40, 80 80"
          fill="none"
          stroke="#388E3C"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="50"
        cy="50"
        rx="15"
        ry="35"
        fill="#4CAF50"
        opacity="0.8"
      />
      <path
        d="M50 15 L50 85"
        stroke="#388E3C"
        strokeWidth="2"
      />
    </svg>
  );
}
