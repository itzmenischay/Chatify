import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import GlassContainer from "../components/GlassContainer";
import { Link } from "react-router-dom";
import { motion } from 'motion/react';

import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  LoaderIcon,
} from "lucide-react";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div className="h-screen w-full overflow-hidden flex items-center justify-center px-4">
      
      {/* CENTERED CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-5xl">
        
        <GlassContainer className="max-h-[90vh]" padding={true}>
          
          <div className="flex">
            
            {/* LEFT */}
            <motion.div 
              initial={isMobile ? { opacity: 0, x: 0 } : { opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 flex items-center justify-center py-6 md:py-10 md:border-r border-slate-600/20">
              
              <div className="w-full max-w-md px-2 sm:px-4">
                
                {/* HEADER */}
                <div className="text-center mb-6">
                  <MessageCircleIcon className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                  <h2 className="text-xl font-bold text-slate-200 mb-1">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Login to your account
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div>
                    <label className="auth-input-label text-sm">
                      Email
                    </label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="input pl-10"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="auth-input-label text-sm">
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        className="input pl-10"
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <button
                    className="auth-btn w-full cursor-pointer"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>

                {/* LINKS */}
                <div className="flex flex-row justify-center gap-5 items-center mt-5 sm:text-xs md:text-xs text-center ">
                  <Link to="#" className="flex justify-center items-center auth-link text-sm">
                    Forgot password?
                  </Link>
                  <Link to="/signup" className="flex justify-center items-center auth-link text-sm">
                    Don’t have an account? Sign up
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* RIGHT (DESKTOP ONLY) */}
            <motion.div 
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="hidden md:flex md:w-1/2 items-center justify-center">
              
              <div className="max-w-xs text-center px-6">
                
                <img
                  src="/login.png"
                  alt="Login Illustration"
                  className="w-full h-auto object-contain"
                />

                <h3 className="text-lg font-medium text-cyan-400 mt-5">
                  Welcome Back Again
                </h3>

                <div className="mt-3 flex justify-center gap-3 flex-wrap">
                  <span className="auth-badge text-xs">Secure</span>
                  <span className="auth-badge text-xs">Fast</span>
                  <span className="auth-badge text-xs">Reliable</span>
                </div>
              </div>
            </motion.div>

          </div>
        </GlassContainer>
      </motion.div>
    </div>
  );
}

export default LoginPage;