import { useState } from 'react';

const Contact = ({ onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    // Keep form submission functionality but also handle modal display
    // For now, uncomment this if you want to prevent actual form submission during testing
    // e.preventDefault();

    // Show success modal after form submission
    setIsSubmitted(true);
  };

  return (
    <div className="contact-section font-body relative isolation-isolate z-1 pt-20 w-4/5 mx-auto">
      <h1 className="font-display text-4xl text-center text-primary t-shadower">Contact</h1>

      <div className="border w-24 h-[10px] bg-secondary my-4 mx-auto"></div>

      <form
        className="contact-form m-auto"
        action="https://formsubmit.co/"
        method="post"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value="VINYL Message" />
        <input type="hidden" name="_autoresponse" value="Thank you for your question! I'll get back to you as soon as possible!" />

        <input
          type="text"
          name="name"
          className="form-control contact-form-text block w-full box-border my-4 border-0 bg-background py-5 px-10 outline-none duration-200 rounded-2xl contact-shadower placeholder:text-secondary/70"
          placeholder="Name"
          required
        />

        <input
          type="email"
          name="email"
          className="form-control contact-form-text block w-full box-border my-4 border-0 bg-background py-5 px-10 outline-none duration-200 rounded-2xl contact-shadower placeholder:text-secondary/70"
          placeholder="Email"
          required
        />

        <textarea
          name="message"
          className="form-control contact-form-text block w-full box-border my-4 border-0 bg-background py-5 px-10 outline-none duration-200 resize-none h-40 rounded-2xl contact-shadower placeholder:text-secondary/70"
          placeholder="Message"
          required
        ></textarea>

        <input
          type="submit"
          className="contact-form-btn float-right border-0 bg-primary py-3 px-12 rounded-[20px] cursor-pointer duration-200 mb-12 nav-shadower"
          value="Send"
        />
      </form>

      {/* Success Modal */}
      {isSubmitted && (
        <div
          className="contact-modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
          onClick={() => setIsSubmitted(false)}
        >
          <div
            className="contact-modal bg-background p-6 rounded-2xl max-w-md w-11/12 relative z-21"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSubmitted(false)}
              className="contact-modal-close absolute top-2 right-3 text-2xl font-bold z-22"
            >
              ×
            </button>

            <h3 className="font-display text-2xl text-primary mb-2">Thank You!</h3>
            <p className="text-secondary">Your message has been sent successfully. We'll get back to you soon.</p>

            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-4 bg-primary py-2 px-6 rounded-[20px] nav-shadower text-background"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Uncomment if you need the close button */}
      {/*
      <button
        onClick={onClose}
        className="font-body p-4 bg-background-600 rounded-[20px] nav-shadower"
      >
        Close
      </button>
      */}
    </div>
  );
};

export default Contact;
