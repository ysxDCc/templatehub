/** Re-mounts on every navigation, so each page gets a gentle fade-and-rise entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="th-page">{children}</div>;
}
