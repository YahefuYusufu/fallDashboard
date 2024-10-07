# React + TypeScript + Vite

# Site address: https://falldashboard.netlify.app/

---

# Mobile Report App Frontend

Welcome to the frontend repository of our Mobile Report App! This project serves as the user interface for efficiently gathering and analyzing data.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **TypeScript**: Adds static typing to JavaScript to enhance code quality and developer productivity.
- **Tailwind CSS**: Utility-first CSS framework for styling components with a responsive and maintainable approach.

## Features

- **Dashboard**: A comprehensive dashboard with multiple sections:
  - **Incident Date Analysis**: Visualizes trends and patterns based on incident dates.
  - **Location Insights**: Provides geographical data insights using maps and charts.
  - **User Queries**: Allows users to query and filter data based on custom parameters.
  - **Visual Data Representation**: Utilizes charts and graphs for clear and concise data presentation.
  - **Animated Chart Line**: Smooth and engaging animations added to the chart lines for an enhanced visual experience. The dynamic updates make the data analysis more interactive and visually appealing.

## Integration with Backend

- Seamless integration with our backend system to fetch and display detailed reports.
- Uses RESTful APIs to communicate with the backend for data retrieval and updates.

## User Experience and Design

- **Responsive Design**: Ensures optimal viewing and interaction experience across a wide range of devices.
- **Intuitive Navigation**: Meticulously crafted navigation for easy access to different sections and functionalities.
- **Comprehensive Analysis Tools**: Empowers users to make informed decisions based on real-time data insights.

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your/repository.git
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Run the development server**:
   ```bash
   yarn dev
   ```

4. **Open your browser**:
   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Video demo of the dashboard


https://github.com/user-attachments/assets/5f0b9d6f-570f-483a-93f2-deaa029873ce





Feel free to customize and expand upon this template based on your specific project details and requirements!
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
	languageOptions: {
		// other options...
		parserOptions: {
			project: ["./tsconfig.node.json", "./tsconfig.app.json"],
			tsconfigRootDir: import.meta.dirname,
		},
	},
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react"

export default tseslint.config({
	// Set the react version
	settings: { react: { version: "18.3" } },
	plugins: {
		// Add the react plugin
		react,
	},
	rules: {
		// other rules...
		// Enable its recommended rules
		...react.configs.recommended.rules,
		...react.configs["jsx-runtime"].rules,
	},
})
```
