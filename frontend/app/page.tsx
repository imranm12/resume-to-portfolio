import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">

        {/* Hero text */}
        <div className="text-center mb-12 flex flex-col gap-4">
          <span
            className="text-xs font-medium px-3 py-1 rounded-full mx-auto"
            style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent)" }}
          >
            Free & Open Source
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Turn your resume into a
            <span style={{ color: "var(--accent)" }}> portfolio</span>
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "var(--muted)" }}>
            Upload your PDF resume and get a beautiful developer portfolio in seconds.
            Runs locally — no account, no data stored.
          </p>
        </div>

        {/* Upload form */}
        <UploadForm />

      </main>
    </>
  );
}