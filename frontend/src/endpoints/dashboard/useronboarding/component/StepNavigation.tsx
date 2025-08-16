import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback } from "react";

const StepNavigation = ({
    currentStep,
    totalSteps,
    onPrev,
    onNext,
    onSkip,
    handelSubmit,
    canSkip = false
}: {
    currentStep: number,
    totalSteps: number,
    onPrev: () => void,
    onNext: () => void,
    onSkip: () => void,
    handelSubmit: () => void
    canSkip?: boolean
}) => {
    const SubmitingForm = useCallback(() => {
        handelSubmit()
        onNext()
    }, [handelSubmit, onNext])
    return (<>
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
            <button
                onClick={onPrev}
                className="flex items-center text-sage-600 hover:text-sage-900 transition-colors"
                disabled={currentStep === 0}
            >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
            </button>

            <div className="flex items-center space-x-2">
                {Array.from({ length: totalSteps - 2 }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${index + 1 <= currentStep ? 'bg-sage-900' : 'bg-sage-200'
                            }`}
                    />
                ))}
            </div>

            {currentStep === totalSteps - 2 ?
                <button
                    onClick={SubmitingForm}
                    className="bg-sage-900 text-cream px-6 py-2 rounded-lg hover:bg-sage-800 transition-colors flex items-center"
                >
                    Complete
                    <ArrowRight className="h-5 w-5 ml-2" />
                </button>
                : <button
                    onClick={onNext}
                    className="bg-sage-900 text-cream px-6 py-2 rounded-lg hover:bg-sage-800 transition-colors flex items-center"
                >
                    Continue
                    <ArrowRight className="h-5 w-5 ml-2" />
                </button>
            }
        </div>

        {canSkip && (
            <div className="text-center mt-4">
                <button
                    onClick={onSkip}
                    className="text-sage-600 hover:text-sage-900 text-sm underline"
                >
                    Skip for now - I'll complete this later
                </button>
            </div>
        )}
    </>)
}
    ;
export default StepNavigation;