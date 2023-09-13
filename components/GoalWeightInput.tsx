// components/GoalWeightInput.tsx
"use client";

// components/GoalWeightInput.tsx

import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface GoalWeightInputProps {
  initialGoalWeight?: string;
  onSubmit: (goalWeight: string, isKeto: boolean) => void;
}

const GoalWeightInput: React.FC<GoalWeightInputProps> = ({ initialGoalWeight = '', onSubmit }) => {
  const [goalWeight, setGoalWeight] = useState(initialGoalWeight);
  const [isKeto, setIsKeto] = useState(false);

  const handleGoalWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGoalWeight(e.target.value);
  };

  const handleKetoChange = () => {
    setIsKeto(!isKeto);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(goalWeight, isKeto);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="goalWeight">Goal Weight:</label>
        <Input type="goal-weight" placeholder="Goal Weight" />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isKeto}
            onChange={handleKetoChange}
          />
          Are you on a keto diet?
        </label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default GoalWeightInput;
