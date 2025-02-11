const Contact = ({ onClose }) => {
  return (
    <div className="font-body relative z-10 pt-20">

      <h1 className="font-display text-4xl text-center text-primary t-shadower">Contact</h1>

      <div className="border w-24 h-[10px] bg-secondary my-4 mx-auto"></div>

      <form className="contact-form max-w-[1000px] m-auto overflow-hidden" action="https://formsubmit.co/" method="post">

        <input type="hidden" name="_subject" value="VINYL Message" />

        <input type="hidden" name="_autoresponse" value="Thank you for your question! I'll get back to you as soon as possible!" />

        <input type="text" name="name" className="form-control contact-form-text block w-full box-border my-4 border-0 bg-background py-5 px-10 outline-none duration-200 rounded-2xl contact-shadower placeholder:text-secondary/70" placeholder="Name" />

        <input type="email" name="email" className="form-control contact-form-text block w-full box-border my-4 border-0 bg-background py-5 px-10 outline-none duration-200 rounded-2xl contact-shadower placeholder:text-secondary/70" placeholder="Email" />

        <textarea name="message" className="form-control contact-form-text block w-full box-border my-4 border-0 bg-background py-5 px-10 outline-none duration-200 resize-none h-40 rounded-2xl contact-shadower placeholder:text-secondary/70" placeholder="Message"></textarea>

        <input type="submit" className="contact-form-btn float-right border-0 bg-primary py-3 px-12 rounded-[20px] cursor-pointer duration-200 mb-12 nav-shadower" value="Send" />

      </form>

      <button
        onClick={onClose}
        className="font-body p-4 bg-background-600 rounded-[20px] nav-shadower"
      >
        Close
      </button> {/* Add a close button */}

  </div>
  );
};

export default Contact;
