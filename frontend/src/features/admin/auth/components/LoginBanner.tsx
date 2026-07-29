import bannerImage from "@/assets/images/robot.png"; // Adjust path as needed
import logo from "@/assets/logo/mediconnect-logo.jpeg"; // Adjust path as needed

const LoginBanner = () => {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2D238C] to-[#4A3DB7]
      flex-col justify-between p-12 text-white min-h-screen"
    >
      <div>
        <div className="flex items-center gap-2">
          <img src={logo} alt="MediConnect Logo" className="h-8 w-8" />
          <h4 className="text-2xl font-bold tracking-tight">MediConnect</h4>
        </div>
      </div>
      
      <div className="flex justify-center items-center py-8">
        <img 
          src={bannerImage} 
          alt="Healthcare professionals" 
          className="max-w-full h-auto max-h-64 object-contain"
        />
      </div>
      
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight">Welcome back Admin</h3>
        <p className="text-gray-200 max-w-sm mx-auto">
          Access doctor details, patients and revenue details securely.
        </p>
        <hr className="border-gray-500/30 my-6 w-24 mx-auto" />
        <p className="text-gray-300 text-sm tracking-wider">Your health, simplified</p>
      </div>
    </div>
  );
};

export default LoginBanner;