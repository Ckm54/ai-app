import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonnials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div
                  className={cn(
                    "text-white font-bold text-sm rounded-full w-8 h-8 flex items-center justify-center",
                    testimonial.bgColor
                  )}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {testimonial.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;

const testimonnials = [
  {
    id: "1",
    name: "userX",
    avatar: "X",
    title: "Software Developer",
    description:
      "This is the best ai generation tool i have used. Just great to have everything in one place.",
    bgColor: "bg-orange-400",
  },
  {
    id: "2",
    name: "Another user",
    avatar: "A",
    title: "Software Developer",
    description:
      "This is the best ai generation tool i have used. Just great to have everything in one place.",
    bgColor: "bg-purple-400",
  },
  {
    id: "3",
    name: "Blue Whale",
    avatar: "B",
    title: "Software Developer",
    description:
      "This is the best ai generation tool i have used. Just great to have everything in one place.",
    bgColor: "bg-emerald-700",
  },
  {
    id: "4",
    name: "Anonymous1",
    avatar: "M",
    title: "Software Developer",
    description:
      "This is the best ai generation tool i have used. Just great to have everything in one place.",
    bgColor: "bg-teal-500",
  },
];
