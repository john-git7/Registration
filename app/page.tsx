"use client";
import { useState } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwTFtatKFRxLywBCDAu-biINg8Yl9-WLZqX2f6wABve8dtqdfVYOxQL_fmqyaVhUqIL3Q/exec";

export default function HackathonForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [teamSize, setTeamSize] = useState(1);

  const [form, setForm] = useState<any>({
    teamName: "",
    leader: {},
    members: [],
    declaration: false,
  });

  const [errors, setErrors] = useState<any>({});

  /* ---------- REGEX (UI ONLY) ---------- */
  const NAME_REGEX = /^[A-Za-z ]+$/;
  const PHONE_REGEX = /^[0-9]{10}$/;
  const EMAIL_REGEX = /^[0-9]{11}@klu\.ac\.in$/;
  const REGNO_REGEX = /^[0-9]+$/;

  const submit = async () => {
    setLoading(true);
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(form),
    });
    setLoading(false);
    setSubmitted(true);
  };

  /* ---------- UI CLASSES ---------- */
   const card =
    "bg-white rounded-xl border border-gray-200 p-6 space-y-6";
  const inputBase =
    "w-full h-[52px] rounded-md px-4 text-sm focus:outline-none transition";
  const inputOk =
    "border border-gray-300 focus:border-[#4F7CFF] focus:ring-2 focus:ring-[#4F7CFF]/20";
  const inputErr =
    "border border-[#FF4D4F] bg-red-50 focus:ring-2 focus:ring-[#FF4D4F]/20";
  const errText = "text-xs text-[#FF4D4F]";

  const pill =
    "px-4 py-2 rounded-full border text-sm transition";
  const pillActive =
    "bg-[#4F7CFF] text-white border-[#4F7CFF]";
  const pillInactive =
    "border-gray-300 text-gray-600 hover:border-[#4F7CFF]";

  const validate = (
    key: string,
    value: string,
    regex: RegExp,
    msg: string
  ) => {
    setErrors((e: any) => ({
      ...e,
      [key]: value && !regex.test(value) ? msg : "",
    }));
  };

  const isStep1Valid = () => {
  return form.teamName.trim() !== "" && teamSize >= 1;
};

const isStep2Valid = () => {
  return (
    form.leader.name &&
    NAME_REGEX.test(form.leader.name) &&
    form.leader.year &&
    form.leader.phone &&
    PHONE_REGEX.test(form.leader.phone) &&
    form.leader.email &&
    EMAIL_REGEX.test(form.leader.email) &&
    form.leader.registerNumber &&
    REGNO_REGEX.test(form.leader.registerNumber) &&
    form.leader.accommodation
  );
};

const isStep3Valid = () => {
  if (teamSize === 1) return true;

  if (form.members.length !== teamSize - 1) return false;

  return form.members.every((m: any) =>
    m?.name &&
    NAME_REGEX.test(m.name) &&
    m?.year &&
    m?.phone &&
    PHONE_REGEX.test(m.phone) &&
    m?.email &&
    EMAIL_REGEX.test(m.email) &&
    m?.registerNumber &&
    REGNO_REGEX.test(m.registerNumber) &&
    m?.accommodation
  );
};


  /* ---------- SUCCESS ---------- */
 if (submitted) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0B0D12] text-white">
      <StarBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-center space-y-8">

          {/* Success Badge */}
          <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-emerald-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Registration Successful 🎉
          </h1>

          {/* Subtext */}
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Your team has been successfully registered for{" "}
            <span className="text-white font-medium">
              FusionVerse Hackathon
            </span>.
            A confirmation has been sent to your college email.
          </p>

          {/* Info Card */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 space-y-3 text-sm">
            <p>
              <span className="text-gray-400">Team:</span>{" "}
              <span className="font-medium text-white">
                {form.teamName}
              </span>
            </p>
            <p>
              <span className="text-gray-400">Team Leader:</span>{" "}
              <span className="font-medium text-white">
                {form.leader.name}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


  /* ---------- MAIN UI ---------- */
  return (
     <div className="min-h-screen px-4 py-10 relative overflow-hidden">
      <StarBackground />

      <div className="relative z-10 max-w-2xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-white space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            FusionVerse Hackathon
          </h1>
          <p className="text-sm text-gray-400">
            Registration · Step {step} of 4
          </p>
        </div>


        {/* STEP 1 */}
        {step === 1 && (
          <div className={card}>
            <h2 className="text-lg font-medium">Team Details</h2>

            <input
              value={form.teamName}
              className={`${inputBase} ${inputOk}`}
              placeholder="Team Name"
              onChange={e =>
                setForm({ ...form, teamName: e.target.value })
              }
            />

           <div>
          <p className="text-lg font-medium ">
            Team Size
          </p>

  <div className="grid grid-cols-4 gap-3">
    {[1, 2, 3, 4].map(n => (
      <button
        key={n}
        onClick={() => setTeamSize(n)}
        className={`rounded-xl p-4 border transition ${
          teamSize === n
            ? "bg-indigo-600 text-white"
            : "bg-white hover:bg-gray-50"
        }`}
      >
        <div className="text-xl">
          {"👤".repeat(n)}
        </div>
        <p className="text-xs mt-2">
          {n} Member{n > 1 && "s"}
        </p>
      </button>
    ))}
  </div>
</div>



            <button
              disabled={!isStep1Valid()}
              onClick={() => isStep1Valid() && setStep(2)}
              className="w-full bg-[#4F7CFF] py-3 rounded-md font-medium disabled:opacity-40"
            >
              Continue →
            </button>
          </div>
        )}

        {/* STEP 2: LEADER */}
        {step === 2 && (
  <div className={card}>
    <h2 className="text-xl font-semibold">Team Leader</h2>

    {/* Leader Name */}
    <p className="text-sm font-medium mt-4 mb-1">Full Name</p>
    <input
      value={form.leader.name || ""}
      className={`${inputBase} ${
        errors.leaderName ? inputErr : inputOk
      }`}
      placeholder="Full Name"
      onChange={e => {
        const v = e.target.value;
        setForm({
          ...form,
          leader: { ...form.leader, name: v },
        });
        validate(
          "leaderName",
          v,
          NAME_REGEX,
          "Only alphabets and spaces allowed"
        );
      }}
    />
    {errors.leaderName && (
      <p className={errText}>{errors.leaderName}</p>
    )}

    {/* Year */}
    <p className="text-sm font-medium mt-4 mb-2">Year of Study</p>
    <div className="flex gap-2">
      {["1st", "2nd", "3rd"].map(y => (
        <button
          key={y}
          type="button"
          onClick={() =>
            setForm({
              ...form,
              leader: { ...form.leader, year: y },
            })
          }
          className={`${pill} ${
            form.leader.year === y
              ? pillActive
              : pillInactive
          }`}
        >
          {y} Year
        </button>
      ))}
    </div>

    {/* Phone */}
    <p className="text-sm font-medium mt-4 mb-1">Phone Number</p>
    <input
      value={form.leader.phone || ""}
      className={`${inputBase} ${
        errors.leaderPhone ? inputErr : inputOk
      }`}
      placeholder="Phone Number"
      onChange={e => {
        const v = e.target.value;
        setForm({
          ...form,
          leader: { ...form.leader, phone: v },
        });
        validate(
          "leaderPhone",
          v,
          PHONE_REGEX,
          "Phone number must be 10 digits"
        );
      }}
    />
    {errors.leaderPhone && (
      <p className={errText}>{errors.leaderPhone}</p>
    )}

    {/* Email */}
    <p className="text-sm font-medium mt-4 mb-1">University Email</p>
    <input
      value={form.leader.email || ""}
      className={`${inputBase} ${
        errors.leaderEmail ? inputErr : inputOk
      }`}
      placeholder="11digits@klu.ac.in"
      onChange={e => {
        const v = e.target.value;
        setForm({
          ...form,
          leader: { ...form.leader, email: v },
        });
        validate(
          "leaderEmail",
          v,
          EMAIL_REGEX,
          "Format: 11digits@klu.ac.in"
        );
      }}
    />
    {errors.leaderEmail && (
      <p className={errText}>{errors.leaderEmail}</p>
    )}

    {/* Register Number */}
    <p className="text-sm font-medium mt-4 mb-1">Register Number</p>
    <input
      value={form.leader.registerNumber || ""}
      className={`${inputBase} ${
        errors.leaderReg ? inputErr : inputOk
      }`}
      placeholder="Register Number"
      onChange={e => {
        const v = e.target.value;
        setForm({
          ...form,
          leader: {
            ...form.leader,
            registerNumber: v,
          },
        });
        validate(
          "leaderReg",
          v,
          REGNO_REGEX,
          "Only numbers allowed"
        );
      }}
    />
    {errors.leaderReg && (
      <p className={errText}>{errors.leaderReg}</p>
    )}

    {/* Accommodation */}
    <p className="text-sm font-medium mt-4 mb-3">
  Accommodation Status
</p>

<div className="flex rounded-xl border overflow-hidden">
  {[
    { v: "HOSTELLER", l: "Hosteller" },
    { v: "DAY_SCHOLAR", l: "Day Scholar" },
  ].map(opt => (
    <button
      key={opt.v}
      onClick={() =>
        setForm({
          ...form,
          leader: {
            ...form.leader,
            accommodation: opt.v,
          },
        })
      }
      className={`flex-1 py-3 text-sm transition ${
        form.leader.accommodation === opt.v
          ? "bg-indigo-600 text-white"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      {opt.l}
    </button>
  ))}
</div>

    {/* Navigation */}
    <div className="flex gap-3 mt-6">
      <button
        onClick={() => setStep(1)}
        className="w-full border py-3 rounded-xl"
      >
        ← Back
      </button>
      <button
        disabled={!isStep2Valid()}
        onClick={() => isStep2Valid() && setStep(3)}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  </div>
)}


        {/* STEP 3: MEMBERS */}
        {step === 3 && (
  <div className={card}>
    <h2 className="text-xl font-semibold">
      Team Member Details
    </h2>

    {teamSize === 1 && (
      <p className="text-sm text-gray-500">
        No additional members.
      </p>
    )}

    {[...Array(teamSize - 1)].map((_, i) => (
      <div
        key={i}
        className="bg-gray-50 border rounded-xl p-4 space-y-4"
      >
        <h3 className="font-medium">
          Member {i + 2}
        </h3>

        {/* FULL NAME */}
        <div>
          <p className="text-sm font-medium mb-1">
            Full Name
          </p>
          <input
            value={form.members[i]?.name || ""}
            className={`${inputBase} ${
              errors[`memberName-${i}`] ? inputErr : inputOk
            }`}
            placeholder="Full Name"
            onChange={e => {
              const v = e.target.value;
              const members = [...form.members];
              members[i] = { ...members[i], name: v };
              setForm({ ...form, members });

              validate(
                `memberName-${i}`,
                v,
                NAME_REGEX,
                "Only alphabets and spaces allowed"
              );
            }}
          />
          {errors[`memberName-${i}`] && (
            <p className={errText}>
              {errors[`memberName-${i}`]}
            </p>
          )}
        </div>

        {/* YEAR */}
        <div>
          <p className="text-sm font-medium mb-2">
            Year of Study
          </p>
          <div className="flex gap-2">
            {["1st", "2nd", "3rd"].map(y => (
              <button
                key={y}
                type="button"
                onClick={() => {
                  const members = [...form.members];
                  members[i] = { ...members[i], year: y };
                  setForm({ ...form, members });
                }}
                className={`${pill} ${
                  form.members[i]?.year === y
                    ? pillActive
                    : pillInactive
                }`}
              >
                {y} Year
              </button>
            ))}
          </div>
        </div>

        {/* PHONE */}
        <div>
          <p className="text-sm font-medium mb-1">
            Phone Number
          </p>
          <input
            value={form.members[i]?.phone || ""}
            className={`${inputBase} ${
              errors[`memberPhone-${i}`] ? inputErr : inputOk
            }`}
            placeholder="Phone Number"
            onChange={e => {
              const v = e.target.value;
              const members = [...form.members];
              members[i] = { ...members[i], phone: v };
              setForm({ ...form, members });

              validate(
                `memberPhone-${i}`,
                v,
                PHONE_REGEX,
                "Phone number must be 10 digits"
              );
            }}
          />
          {errors[`memberPhone-${i}`] && (
            <p className={errText}>
              {errors[`memberPhone-${i}`]}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <p className="text-sm font-medium mb-1">
            University Email
          </p>
          <input
            value={form.members[i]?.email || ""}
            className={`${inputBase} ${
              errors[`memberEmail-${i}`] ? inputErr : inputOk
            }`}
            placeholder="11digits@klu.ac.in"
            onChange={e => {
              const v = e.target.value;
              const members = [...form.members];
              members[i] = { ...members[i], email: v };
              setForm({ ...form, members });

              validate(
                `memberEmail-${i}`,
                v,
                EMAIL_REGEX,
                "Format: 11digits@klu.ac.in"
              );
            }}
          />
          {errors[`memberEmail-${i}`] && (
            <p className={errText}>
              {errors[`memberEmail-${i}`]}
            </p>
          )}
        </div>

        {/* REGISTER NUMBER */}
        <div>
          <p className="text-sm font-medium mb-1">
            Register Number
          </p>
          <input
            value={form.members[i]?.registerNumber || ""}
            className={`${inputBase} ${
              errors[`memberReg-${i}`] ? inputErr : inputOk
            }`}
            placeholder="Register Number"
            onChange={e => {
              const v = e.target.value;
              const members = [...form.members];
              members[i] = {
                ...members[i],
                registerNumber: v,
              };
              setForm({ ...form, members });

              validate(
                `memberReg-${i}`,
                v,
                REGNO_REGEX,
                "Only numbers allowed"
              );
            }}
          />
          {errors[`memberReg-${i}`] && (
            <p className={errText}>
              {errors[`memberReg-${i}`]}
            </p>
          )}
        </div>

        {/* ACCOMMODATION */}
        <div>
          <p className="text-sm font-medium mb-3">
  Accommodation Status
</p>

<div className="flex rounded-xl border overflow-hidden">
  {[
    { v: "HOSTELLER", l: "Hosteller" },
    { v: "DAY_SCHOLAR", l: "Day Scholar" },
  ].map(opt => (
    <button
      key={opt.v}
      type="button"
      onClick={() => {
        const members = [...form.members];
        members[i] = {
          ...members[i],
          accommodation: opt.v,
        };
        setForm({ ...form, members });
      }}
      className={`flex-1 py-3 text-sm font-medium transition ${
        form.members[i]?.accommodation === opt.v
          ? "bg-indigo-600 text-white"
          : "bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      {opt.l}
    </button>
  ))}
</div>

        </div>
      </div>
    ))}

    <div className="flex gap-3 mt-6">
      <button
        onClick={() => setStep(2)}
        className="w-full border py-3 rounded-xl"
      >
        ← Back
      </button>
      <button
        disabled={!isStep3Valid()}
        onClick={() => isStep3Valid() && setStep(4)}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  </div>
)}



        {/* STEP 4: REVIEW */}
        {step === 4 && (
  <div className={card}>
    <h2 className="text-xl font-semibold">Review & Confirm</h2>
    <p className="text-sm text-gray-500">
      Please verify all details before submitting
    </p>

    {/* TEAM INFO */}
    <div className="rounded-xl border bg-white p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">
          Team Information
        </p>
        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
          Team Size: {teamSize}
        </span>
      </div>

      <p className="text-sm">
        <span className="font-semibold">Team Name:</span>{" "}
        {form.teamName}
      </p>
    </div>

    {/* LEADER */}
    <div className="rounded-xl border bg-gray-50 p-4 space-y-2">
      <p className="font-medium text-gray-800">
        Team Leader
      </p>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <p><b>Name:</b> {form.leader.name}</p>
        <p><b>Year:</b> {form.leader.year}</p>
        <p><b>Email:</b> {form.leader.email}</p>
        <p><b>Phone:</b> {form.leader.phone}</p>
        <p><b>Register No:</b> {form.leader.registerNumber}</p>
        <p><b>Accommodation:</b> {form.leader.accommodation}</p>
      </div>
    </div>

    {/* MEMBERS */}
    {teamSize > 1 && (
      <div className="space-y-4">
        <p className="font-medium text-gray-800">
          Team Members
        </p>

        {form.members.map((m: any, i: number) => (
          <div
            key={i}
            className="rounded-xl border bg-gray-50 p-4"
          >
            <p className="font-medium mb-2">
              Member {i + 2}
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <p><b>Name:</b> {m.name}</p>
              <p><b>Year:</b> {m.year}</p>
              <p><b>Email:</b> {m.email}</p>
              <p><b>Phone:</b> {m.phone}</p>
              <p><b>Register No:</b> {m.registerNumber}</p>
              <p><b>Accommodation:</b> {m.accommodation}</p>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* DECLARATION */}
    <label className="flex gap-3 items-start bg-yellow-50 border border-yellow-200 rounded-xl p-4">
      <input
        type="checkbox"
        className="mt-1"
        onChange={e =>
          setForm({
            ...form,
            declaration: e.target.checked,
          })
        }
      />
      <span className="text-sm text-gray-700">
        I confirm that all the above details are correct and
        belong to our team.
      </span>
    </label>

    {/* ACTIONS */}
    <div className="flex gap-3 pt-2">
      <button
        onClick={() => setStep(3)}
        className="w-full border py-3 rounded-xl hover:bg-gray-50 transition"
      >
        ← Back
      </button>
      <button
        disabled={!form.declaration || loading}
        onClick={submit}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Registration"}
      </button>
    </div>
  </div>
)}


      </div>
    </div>
  );
}

function StarBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0B0D12] pointer-events-none">
      <div className="stars stars-far" />
      <div className="stars stars-mid" />
      <div className="stars stars-near" />

      <style jsx>{`
        .stars {
          position: absolute;
          inset: -300px;
          background-repeat: repeat;
          will-change: transform;
        }

        /* FAR STARS – barely moving */
        .stars-far {
          background-image:
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.18) 1px, transparent 0),
            radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.18) 1px, transparent 0),
            radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.18) 1px, transparent 0);
          background-size: 420px 420px;
          animation: driftFar 160s linear infinite;
        }

        /* MID STARS */
        .stars-mid {
          background-image:
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.3) 1px, transparent 0),
            radial-gradient(1px 1px at 60% 60%, rgba(255,255,255,0.3) 1px, transparent 0),
            radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.3) 1px, transparent 0);
          background-size: 300px 300px;
          animation: driftMid 110s linear infinite;
        }

        /* NEAR STARS – most visible */
        .stars-near {
          background-image:
            radial-gradient(1px 1px at 30% 50%, rgba(255,255,255,0.45) 1px, transparent 0),
            radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.45) 1px, transparent 0),
            radial-gradient(1px 1px at 90% 70%, rgba(255,255,255,0.45) 1px, transparent 0);
          background-size: 220px 220px;
          animation: driftNear 70s linear infinite;
        }

        @keyframes driftFar {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-120px, -200px, 0); }
        }

        @keyframes driftMid {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-220px, -320px, 0); }
        }

        @keyframes driftNear {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-380px, -520px, 0); }
        }
      `}</style>
    </div>
  );
}
