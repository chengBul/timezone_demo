# Timezone Demo App

A React application that demonstrates handling timezone conversions globally, showing all times in Eastern Time (ET) regardless of the user's local timezone.

## Features

- Global timezone context to handle all date/time conversions
- Live clock showing current time in Eastern Time (ET)
- Date converter to convert any date to Eastern Time
- Display of local timezone information for comparison

## Technologies Used

- React
- TypeScript
- date-fns and date-fns-tz for timezone handling

## How to Run

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

The application uses a React context (`TimezoneContext`) to provide timezone conversion functions throughout the app:

- `formatToET(date, formatString)`: Converts any date to Eastern Time and formats it according to the provided format string
- `getCurrentETTime()`: Gets the current time in Eastern Time

This ensures that all parts of the application display times consistently in Eastern Time, regardless of the user's local timezone.
