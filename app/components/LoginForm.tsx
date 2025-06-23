import { Form, useNavigation } from "react-router";

export default function LoginForm() {
  const navigation = useNavigation();
  const isLogging = navigation.state === "submitting";

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Login</h2>
        </div>

        <Form method="post" className="px-6 py-6 space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="login-email"
                name="email"
                type="email"
                required
                autoComplete="username"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="login-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          {/* 5. Footer Buttons */}
          <div className="flex justify-end space-x-6 pt-4 border-t border-gray-200">
            {/* Submit (“Log In”)—because type="submit", the browser will enforce validation */}
            <button
              id="login"
              type="submit"
              disabled={isLogging}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none cursor-pointer"
            >
              {isLogging ? "Loggin in..." : "Log In"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
