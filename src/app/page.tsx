import { MechanicsLibrary } from '@/components/MechanicsLibrary';
import { Editor } from '@/components/Editor';

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar - Mechanics Library */}
      <div className="w-72 bg-white p-4 border-r border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Mechanics Library</h2>
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <MechanicsLibrary />
        </div>
      </div>

      {/* Main Content - Document Editor */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Design Deck</h1>
          <Editor />
        </div>
      </div>

      {/* Right Sidebar - Project Tags */}
      <div className="w-72 bg-white p-4 border-l border-gray-200">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Project Tags</h2>
        {/* ProjectTags component will go here */}
      </div>
    </main>
  );
}
