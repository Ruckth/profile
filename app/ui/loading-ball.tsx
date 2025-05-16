import * as motion from "motion/react-client";

interface LoadingBallProps {
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingBall({ count = 1, size = 'sm' }: LoadingBallProps ) {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
    };
  return (
    <div className="flex gap-4">
      {[...Array(count)].fill(null).map((_, index) => (
       <motion.div 
         key={index} 
         className={`${sizeClasses[size]} rounded-full bg-blue-200 flex items-center justify-center text-xs`}
         animate={{
           scale: [1,2,1,1,1,1],
           opacity: [1,0.5,1,1,1,1],
         }}
         transition={{
           duration: 6,
           repeat: Infinity,
           delay: index * 1
         }}
       >
         {/* <p className="text-blue-950">wait</p> */}
       </motion.div>
      ))}
    </div>
  );
}
