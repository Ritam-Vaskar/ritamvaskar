"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const EducationCard = ({ data, index, isEven }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? 100 : -100,
      rotateY: isEven ? 45 : -45
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`relative group ${isEven ? 'ml-auto' : 'mr-auto'}`}
    >
      {/* Card Container */}
      <div className="w-full md:w-[700px] p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-purple-500/20 shadow-xl hover:shadow-purple-500/10 transition-all duration-500">
        {/* Floating Icons */}
        <motion.div
          className="absolute -top-6 -right-6 p-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <GraduationCap className="w-6 h-6 text-white" />
        </motion.div>

        {/* Content */}
        <div className="space-y-4">
          {/* Institution Name */}
          <motion.h3 
            className="text-xl font-bold text-white"
            whileHover={{ scale: 1.02 }}
          >
            {data.institution}
          </motion.h3>

          {/* Degree */}
          <p className="text-purple-500 font-medium">{data.degree}</p>

          {/* Info Row */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{data.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{data.location}</span>
            </div>
          </div>

          {/* Grade */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Grade:</span>
              <span className="text-purple-500 font-medium">{data.grade}</span>
            </div>
            <motion.div 
              className="h-2 rounded-full bg-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                initial={{ width: 0 }}
                whileInView={{ width: data.gradePercentage + '%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Hover Effect Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
};

export default EducationCard;