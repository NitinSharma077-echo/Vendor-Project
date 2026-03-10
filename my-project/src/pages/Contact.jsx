// src/pages/Contact.jsx
export default function Contact() {
    return (
        <div className="container mx-auto px-5 py-16 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Get in Touch</h1>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
                Questions about vendors, features, or listing your software?
            </p>

            <form className="space-y-6 bg-white dark:bg-slate-800 p-8 md:p-12 rounded-2xl shadow-xl">
                <div className="grid md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Full Name" className="w-full px-5 py-4 rounded-lg border dark:bg-slate-700 dark:border-slate-600" />
                    <input type="email" placeholder="Email Address" className="w-full px-5 py-4 rounded-lg border dark:bg-slate-700 dark:border-slate-600" />
                </div>
                <input type="text" placeholder="Subject" className="w-full px-5 py-4 rounded-lg border dark:bg-slate-700 dark:border-slate-600" />
                <textarea
                    rows={6}
                    placeholder="Your message..."
                    className="w-full px-5 py-4 rounded-lg border dark:bg-slate-700 dark:border-slate-600"
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-4 rounded-lg font-medium hover:bg-indigo-700 transition text-lg"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}