export const Stylesheet = ({ size = 100, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 20V90C3.5 94.1421 6.85786 97.5 11 97.5H72C76.1421 97.5 79.5 94.1421 79.5 90V20C79.5 15.8579 76.1421 12.5 72 12.5H11C6.85786 12.5 3.5 15.8579 3.5 20Z"
      stroke={color}
      strokeWidth="5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M45 15H50V8C50 6.34315 51.3431 5 53 5H92C93.6569 5 95 6.34315 95 8V60C95 61.6569 93.6569 63 92 63H77V68H92C96.4183 68 100 64.4183 100 60V8C100 3.58173 96.4183 0 92 0H53C48.5817 0 45 3.58172 45 8V15Z"
      fill={color}
    />
  </svg>
)

export const ScaledValues = ({ size = 100, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 10V90C3.5 94.1421 6.85786 97.5 11 97.5H90C94.1421 97.5 97.5 94.1421 97.5 90V10C97.5 5.85786 94.1421 2.5 90 2.5H11C6.85786 2.5 3.5 5.85787 3.5 10Z"
      stroke={color}
      strokeWidth="5"
    />
    <path
      d="M16.5 81.6396C16.5 83.0203 17.6193 84.1396 19 84.1396H41.5C42.8807 84.1396 44 83.0203 44 81.6396C44 80.2589 42.8807 79.1396 41.5 79.1396H21.5V59.1396C21.5 57.7589 20.3807 56.6396 19 56.6396C17.6193 56.6396 16.5 57.7589 16.5 59.1396V81.6396ZM85.1396 18C85.1396 16.6193 84.0203 15.5 82.6396 15.5L60.1396 15.5C58.7589 15.5 57.6396 16.6193 57.6396 18C57.6396 19.3807 58.7589 20.5 60.1396 20.5H80.1396V40.5C80.1396 41.8807 81.2589 43 82.6396 43C84.0203 43 85.1396 41.8807 85.1396 40.5L85.1396 18ZM20.7678 83.4074L84.4074 19.7677L80.8718 16.2322L17.2322 79.8718L20.7678 83.4074Z"
      fill={color}
    />
  </svg>
)

export const AdaptiveValues = ({ size = 100, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 10V90C3.5 94.1421 6.85786 97.5 11 97.5H90C94.1421 97.5 97.5 94.1421 97.5 90V10C97.5 5.85786 94.1421 2.5 90 2.5H11C6.85786 2.5 3.5 5.85787 3.5 10Z"
      stroke={color}
      strokeWidth="5"
    />
    <line
      x1="21.2695"
      y1="40.2604"
      x2="42.4827"
      y2="61.4736"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
    />
    <line
      x1="20.734"
      y1="61.4736"
      x2="41.9472"
      y2="40.2604"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
    />
    <circle cx="70" cy="50" r="12.5" stroke={color} strokeWidth="5" />
  </svg>
)

export const Breakpoints = ({ size = 100, color = 'white' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 10V90C3.5 94.1421 6.85786 97.5 11 97.5H52C56.1421 97.5 59.5 94.1421 59.5 90V10C59.5 5.85786 56.1421 2.5 52 2.5H11C6.85786 2.5 3.5 5.85787 3.5 10Z"
      stroke={color}
      strokeWidth="5"
    />
    <path
      d="M71.5 10V90C71.5 94.1421 74.8579 97.5 79 97.5H88C92.1421 97.5 95.5 94.1421 95.5 90V10C95.5 5.85786 92.1421 2.5 88 2.5H79C74.8579 2.5 71.5 5.85787 71.5 10Z"
      stroke={color}
      strokeWidth="5"
    />
  </svg>
)
