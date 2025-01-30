import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "../components/ui/card.jsx";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Link, redirect } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";

import { storeUser, uploadImage } from "./firebase/StoreNewUser.js";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    collegeName: "",
    rollNumber: "",
    department: "",
    year: "",
    phoneNumber: "",
    email: "",
    event: "",
    paymentScreenshot: null,
  });
  const [payAmount, setPayAmount] = useState(0);

  const handlePayAmount = (value) => {
    // console.log(value);
    if (value === "event1" || value === "event2") setPayAmount(500);
    else if (value === "event12") {
      setPayAmount(800);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      ...formData,
      // paymentScreenshot: formData.paymentScreenshot
      //   ? formData.paymentScreenshot.name
      //   : null,
    });

    try {
      const imageUrl = await uploadImage(
        formData.paymentScreenshot,
        formData.email
      );

      const newUser = await storeUser({
        name: formData.fullName,
        roll: formData.rollNumber,
        paymentUrl: imageUrl,
        event: formData.event,
        year: formData.year,
        department: formData.department,
        email: formData.email,
        college: formData.collegeName,
        phone: formData.phoneNumber,
      });
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800 px-5 py-4">
        <CardHeader>
          <motion.div
            className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent text-center lg:mb-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sristi 2025 Registration
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {/* Form Fields */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Label htmlFor="fullName" className="text-zinc-200">
                Full Name
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                className="mt-1 p-2 rounded-md bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus:ring-red-500 focus:border-red-500"
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Label htmlFor="college" className="text-zinc-200">
                College Name
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, collegeName: value })
                }
              >
                <SelectTrigger className="mt-1 p-2 rounded-md bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select your college" />
                </SelectTrigger>
                <SelectContent className="min-w-[150px] bg-zinc-800 border-white p-3 rounded-md cursor-pointer ">
                  <SelectItem className="mt-1" value="op1">
                    Jalpaiguri Government Engineering College
                  </SelectItem>
                  <SelectItem className="mt-3 mb-1" value="op2">
                    Others
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Label htmlFor="rollNumber" className="text-zinc-200">
                Roll Number
              </Label>
              <Input
                id="rollNumber"
                placeholder="Enter your roll number"
                className="mt-1 bg-zinc-800 p-2 rounded-md border-zinc-700 text-white placeholder:text-zinc-400"
                onChange={(e) =>
                  setFormData({ ...formData, rollNumber: e.target.value })
                }
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Label htmlFor="department" className="text-zinc-200">
                Department
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, department: value })
                }
              >
                <SelectTrigger className="mt-1 p-2 rounded-md bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent className="min-w-[150px] bg-zinc-800 border-zinc-700 p-3 rounded-md cursor-pointer gap-4">
                  <SelectItem className="mt-1" value="cse">
                    Computer Science and Engineering
                  </SelectItem>
                  <SelectItem className="mt-2" value="it">
                    Information Technology
                  </SelectItem>
                  <SelectItem className="mt-2" value="eve">
                    Electornics and Engineering
                  </SelectItem>
                  <SelectItem className="mt-2" value="ee">
                    Electrical Engineering
                  </SelectItem>
                  <SelectItem className="mt-2" value="me">
                    Mechanical Engineering
                  </SelectItem>
                  <SelectItem className="mt-2 mb-1" value="ce">
                    Civil Engineering
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Label htmlFor="year" className="text-zinc-200">
                Year
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, year: value })
                }
              >
                <SelectTrigger className="mt-1 p-3 rounded-md cursor-pointer gap-4 bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent className="min-w-[150px] bg-zinc-800 border-zinc-700 p-3 rounded-md cursor-pointer gap-4">
                  <SelectItem className="mt-1" value="1">
                    First Year
                  </SelectItem>
                  <SelectItem className="mt-2" value="2">
                    Second Year
                  </SelectItem>
                  <SelectItem className="mt-2" value="3">
                    Third Year
                  </SelectItem>
                  <SelectItem className="mt-2 mb-1 " value="4">
                    Fourth Year
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Label htmlFor="phone" className="text-zinc-200">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="mt-1 bg-zinc-800 border-zinc-700 p-3 rounded-md text-white placeholder:text-zinc-400"
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Label htmlFor="email" className="text-zinc-200">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="mt-1 p-3 rounded-md bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Label htmlFor="event" className="text-zinc-200">
                Event
              </Label>
              <Select
                onValueChange={(value) => {
                  setFormData({ ...formData, event: value }),
                    handlePayAmount(value);
                }}
              >
                <SelectTrigger className="mt-1 bg-zinc-800 border-zinc-700 text-white p-3 rounded-md">
                  <SelectValue placeholder="Select your event" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 p-3 rounded-md cursor-pointer min-w-[150px]">
                  <SelectItem className="mt-1" value="event1">
                    Event 1
                  </SelectItem>
                  <SelectItem className="mt-2" value="event2">
                    Event 2
                  </SelectItem>
                  <SelectItem className="mt-2 mb-1" value="event12">
                    Event 1 + 2
                  </SelectItem>
                </SelectContent>
              </Select>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-red-600 mt-3"
              >
                Participation Fee: Event 1 or 2 - ₹500, Both (1+2) - ₹800
              </motion.p>

              {payAmount !== 0 && (
                <motion.div
                className="mt-5">
                  <a
                    href={
                      payAmount === 500
                        ? "upi://pay?pa=sristijgec@sbi&pn=SRISTIJALPAIGURI%20GOVT%20ENGG%20COLLEGE&mc=8220&tr=&tn=&am=500&cu=INR&url=&mode=02&purpose=00&orgid=180102&sign=MEQCIBpUcu1IGX07X7+IPlV6AYfA43SSwUaV/VV+19w2cIRNAiA0qD2s6BqIza4HZhd9M2SPsSdCp8ShUlbDql6V7SviQQ=="
                        : "upi://pay?pa=sristijgec@sbi&pn=SRISTIJALPAIGURI%20GOVT%20ENGG%20COLLEGE&mc=8220&tr=&tn=&am=800&cu=INR&url=&mode=02&purpose=00&orgid=180102&sign=MEQCIBpUcu1IGX07X7+IPlV6AYfA43SSwUaV/VV+19w2cIRNAiA0qD2s6BqIza4HZhd9M2SPsSdCp8ShUlbDql6V7SviQQ=="
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-3 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors font-bold lg:ml-[40%]"
                  >
                    PAY NOW (&#8377;{payAmount})
                  </a>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Label htmlFor="paymentScreenshot" className="text-zinc-200">
                Payment Screenshot
              </Label>
              <div className="mt-1 flex items-center justify-center w-full">
                <label
                  htmlFor="paymentScreenshot"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-zinc-700 border-dashed rounded-lg cursor-pointer bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-zinc-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-zinc-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-zinc-400">
                      PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <Input
                    id="paymentScreenshot"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFormData({ ...formData, paymentScreenshot: file });
                    }}
                  />
                </label>
              </div>
              {formData.paymentScreenshot && (
                <p className="mt-2 text-sm text-zinc-400">
                  File selected: {formData.paymentScreenshot.name}
                </p>
              )}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Button
                type="submit"
                className="w-full p-3 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Register
              </Button>
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </div>
  );
}
