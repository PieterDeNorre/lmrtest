# LMR Test - Next.js + Tailwind CSS Project

A modern [Next.js](https://nextjs.org) project with [Tailwind CSS v4](https://tailwindcss.com) and [Tailwind Variants](https://www.tailwind-variants.org/) for component styling.

## 🚀 Quick Start

### Prerequisites

- **Node.js 20.9.0 or higher** (required for Next.js 16)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd lmrtest
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Component Variants**: [Tailwind Variants](https://www.tailwind-variants.org/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Utilities**: [Tailwind Merge](https://github.com/dcastil/tailwind-merge)
- **Language**: TypeScript
- **Fonts**: [Geist](https://vercel.com/font) font family

## 📁 Project Structure

```
├── src/
│   └── app/
│       ├── globals.css       # Global styles & Tailwind config
│       ├── layout.tsx        # Root layout
│       └── page.tsx          # Home page
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Obsidian Setup

This project includes an Obsidian vault for project documentation and task management.

### Installation & Setup

1. **Install Obsidian**

   - Download from [obsidian.md](https://obsidian.md)
   - Install for your operating system

2. **Open the Vault**

   - Launch Obsidian
   - Click "Open folder as vault"
   - Select the `Obsidian_LMR` folder in this project

3. **Install Required Plugins**
   - In Obsidian, go to Settings → Community plugins
   - Turn on "Community plugins" if not already enabled
   - Browse community plugins and install the following:
     - **Dataview**: Search for "Dataview", install and enable for data queries and calculations
       - After installation, go to Dataview settings and enable "Enable DataviewJS" for advanced queries
     - **Kanban**: Search for "Kanban", install and enable for project task management
     - **Lovely-mindmap**: Search for "Lovely-mindmap", install and enable for visual mind mapping
