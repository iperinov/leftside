import type React from "react";
import { useState } from "react";
import { useEditConfiguration } from "../../hooks/useEditConfiguration";

export interface EditConfigurationProps {
  onClose: () => void;
  uuid: string;
  name: string;
}

export const EditConfiguration: React.FC<EditConfigurationProps> = ({
  onClose,
  uuid,
  name,
}) => {
  const [assignedBooks, setAssignedBooks] = useState<number[]>([]);
  const { update, isLoading } = useEditConfiguration();

  const handleSave = async () => {
    try {
      await update(uuid, {
        name: name,
        books: assignedBooks,
      });
      onClose();
    } catch (err) {
      console.error("Failed to create configuration:", err);
      // TODO: show toast error
    }
  };

  return (
    <div className="fixed inset-0 bg-white text-gray-700 flex flex-col">
      {/* Header */}
      <div className="bg-stone-500 text-white px-6 py-3 text-sm font-medium shadow">
        Edit: {name}
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden divide-x">
        {/* Left Column */}
        <div className="w-1/3 bg-stone-100 p-4 flex flex-col items-center justify-center text-center gap-4">
          <div className="border border-gray-400 rounded p-4 w-full">
            <p className="text-sm mb-4">
              Start building your navigation structure by adding 1st level item
            </p>
            <button
              type="button"
              className="border border-gray-400 rounded px-4 py-1 text-sm"
            >
              Add 1st level
            </button>
          </div>
        </div>

        {/* Middle Column */}
        <div className="w-1/3 bg-gray-200 p-4 flex items-center justify-center text-center">
          <div className="border border-gray-400 rounded p-4 w-full text-sm">
            Select child navigation item to proceed. Add content by assigning
            data selections to navigation items.
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/3 bg-stone-50 p-4 flex flex-col gap-4">
          <div className="border border-gray-400 rounded p-4 text-sm">
            <label className="block mb-2">
              Assigned to
              <select multiple className="mt-1">
                <option value="Book1">Book1</option>
                <option value="Book2">Book2</option>
                <option value="Book3">Book3</option>
                <option value="Book4">Book4</option>
              </select>
            </label>
          </div>
          <div className="border border-gray-400 rounded p-4 text-sm text-center">
            Preview how the data selection looks on website
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-stone-500 text-sm text-right px-6 py-3 text-white flex justify-end gap-6">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="text-sm hover:underline cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className={`text-sm cursor-pointer ${
            isLoading ? "opacity-50 pointer-events-none" : "hover:underline"
          }`}
        >
          {isLoading ? "Processing..." : "Save changes"}
        </button>
      </div>
    </div>
  );
};
