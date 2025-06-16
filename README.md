# Interview/Profile Management Application

A modern web application built with Next.js, TypeScript, and Tailwind CSS, featuring a beautiful UI powered by Radix UI components and shadcn/ui.

## 🚀 Features

- **Modern UI/UX**: Built with Tailwind CSS and Radix UI primitives
- **Type Safety**: Full TypeScript support
- **Authentication**: Secure authentication system
- **Dashboard**: Interactive dashboard for user management
- **Profile Management**: User profile creation and editing
- **Responsive Design**: Works on desktop and mobile devices
- **Performance**: Optimized for fast loading and smooth interactions

## 🛠 Technologies Used

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Form Handling**: React Hook Form
- **State Management**: React Context
- **Icons**: Lucide React
- **3D Support**: @react-three/fiber & @react-three/drei
- **Animation**: Framer Motion

## 📦 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd fourthpro
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=your_api_url_here
   # Add other environment variables as needed
   ```

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🏗 Project Structure

```
fourthpro/
├── app/                    # App router pages and layouts
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Dashboard pages
│   ├── interview/          # Interview related pages
│   ├── profile/            # User profile pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
├── public/                 # Static files
└── styles/                 # Global styles
```

## 🚀 Available Scripts

- `pnpm dev` or `npm run dev` - Start the development server
- `pnpm build` or `npm run build` - Build for production
- `pnpm start` or `npm start` - Start the production server
- `pnpm lint` or `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
