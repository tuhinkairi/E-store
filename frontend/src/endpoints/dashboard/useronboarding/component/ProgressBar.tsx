const ProgressBar = ({ currentStep, totalSteps }:{currentStep:number, totalSteps:number}) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-sage-600">Step {currentStep + 1} of {totalSteps}</span>
      <span className="text-sm text-sage-600">
        {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
      </span>
    </div>
    <div className="w-full bg-sage-200 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-sage-900 to-sage-700 h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
      />
    </div>
  </div>
);
export default ProgressBar