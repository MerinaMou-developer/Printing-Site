"use client";

/**
 * Simple test component to verify Redux is working
 * You can use this in any page to test Redux integration
 */
import { useGetPostsQuery } from "@/redux/features/placeholder/placeholderApi";
import { useAppSelector } from "@/redux/hooks";

export default function ReduxTest() {
  // Test RTK Query hook
  const { data, isLoading, error } = useGetPostsQuery();
  
  // Test Redux store access
  const apiState = useAppSelector((state) => state.api);

  if (isLoading) {
    return (
      <div className="p-4 border rounded">
        <p className="text-green-600">✅ Redux is connected! Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded bg-red-50">
        <p className="text-red-600">❌ Error: {JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded bg-green-50">
      <p className="text-green-600 font-semibold mb-2">
        ✅ Redux is working perfectly!
      </p>
      <p className="text-sm text-gray-600 mb-2">
        Posts loaded: {data?.length || 0}
      </p>
      <p className="text-xs text-gray-500">
        API State Keys: {Object.keys(apiState.queries || {}).length} queries
      </p>
    </div>
  );
}

