# My-Calendar

**[Live Website](https://my-calendar-smoky.vercel.app/)**

## 🚀 About

Calendar App is a modern and intuitive web application that allows users to manage their schedules efficiently. Users can sign in seamlessly using **Google**, **GitHub**, or a **Magic Link** and add notes for each date through an interactive calendar interface.

### ✨ Features

- **Secure Authentication** – Sign in via Google, GitHub, or Magic Link.
- **Interactive Calendar** – Easily navigate and manage events.
- **Add Notes** – Attach personalized notes to specific dates.
- **Cloud-Based Storage** – Data is securely stored and retrieved using **Supabase**.
- **Responsive UI** – Built with **Tailwind CSS** for a sleek and modern design.

## 🛠 Tech Stack

- **Next.js** – Server-side rendering and optimized performance.
- **Tailwind CSS** – Modern and responsive styling.
- **Supabase** – Authentication & database management.

## 🚀 Installation & Setup

To run the Calendar App locally, follow these steps:

```sh
# Clone the repository
git clone https://github.com/your-username/my-calendar.git

# Navigate to the project directory
cd my-calendar

# Install dependencies
npm install

# Create a .env.local file and add your Supabase credentials
echo "NEXT_PUBLIC_SUPABASE_URL=your-supabase-url" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key" >> .env.local

# Start the development server
npm run dev
```

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Calendar App, feel free to fork the repository, create a feature branch, and submit a pull request.

## 📜 License

This project is licensed under the MIT License.
