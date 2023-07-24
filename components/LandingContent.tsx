'use client';

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {name: 'Abdelrahman Gamal', avatar: 'A', title: 'Software Engineer', description: 'This AI SaaS Website is truly exceptional, boasting a stunning UI design, seamless organization, and a generous free trial allowing users to experience its full capabilities before making a purchase. Additionally, its responsive customer support and remarkable payment system further elevate the overall user experience.'}
];

export const LandingContent = () => {
    return(
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.description} className="bg-white/5 border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 rounded-full">
                                    <p className="text-white text-xl font-bold">{testimonial.avatar}</p>
                                </div>
                                <div>
                                    <p className="text-lg">{testimonial.name}</p><p className="text-zinc-400 text-sm">{testimonial.title}</p>
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
    )
};