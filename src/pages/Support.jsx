import { useRef } from "react";
import emailjs from "@emailjs/browser";

const Support = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("myJournalSupport", "template_f0rpx0k", form.current, {
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
    try {
      alert("Successfully sent your message!");
      form.current.reset();
    } catch (error) {
      alert("Error in sending message!!");
      console.log("FAILED...", error.text);
    }
  };
  return (
    <div className="pt-10 min-h-screen flex justify-center bg-gradient-to-b from-slate-400 to-stone-200">
      {/* 1st and 2nd Column */}
      <div className="mx-3 px-5 md:mx-4 md:px-14 py-10  md:flex gap-20 max-w-5xl h-full bg-gray-100 rounded-2xl">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-600 to-blue-800 bg-clip-text text-transparent">
            Support
          </h1>
          <p className="text-gray-800 text-lg font-medium">
            For more info and support, feel free to contact us
          </p>
          {/* FORM */}
          <form
            onSubmit={sendEmail}
            ref={form}
            className="mt-3 p-2 md:p-3 space-y-5"
          >
            <div>
              <label className="block text-md font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block mb-1 text-md font-medium text-gray-700">
                Email
              </label>
              <input
                name="user_email"
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block mb-1 text-md font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                type="text"
                className="h-20 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              />
            </div>
            <button
              type="submit"
              value="Send"
              className="px-3 py-2 rounded bg-blue-700 text-white hover:bg-blue-800 cursor-pointer shadow shadow-black"
            >
              Submit
            </button>
          </form>
        </div>
        {/* 2nd column-Contact Info Section */}
        <div className="pl-2 mt-5 w-full md:w-72 flex flex-col">
          <h3 className="text-2xl font-semibold mb-5 bg-gradient-to-r from-gray-700 to-blue-800 bg-clip-text text-transparent">
            Contact Support
          </h3>
          {/* GMAIL */}
          <p className="flex gap-1 text-gray-700 mb-2">
            <img src="./src/assets/gmail.png" className="w-9 h-9" />
            <a
              href="mailto:py624833@gmail.com"
              className="text-blue-600 underline"
            >
              py624833@gmail.com
            </a>
          </p>
          {/* TWITTER */}
          <p className="flex gap-1 text-gray-700">
            <img src="./src/assets/twitter.png" className="w-9 h-8" />
            <a
              href="https://x.com/Piyush9436"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              @Piyush9436
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Support;
