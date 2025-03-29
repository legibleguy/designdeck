interface MechanicCardProps {
  title: string;
  description: string;
  category?: string;
  longDescription?: string;
  examples?: string[];
  solvedProblems?: string[];
  minTimeToImplement?: string;
  maxTimeToImplement?: string;
  timeToImplementExplained?: string;
}

export function MechanicCard({ title, description }: MechanicCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow">
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
} 