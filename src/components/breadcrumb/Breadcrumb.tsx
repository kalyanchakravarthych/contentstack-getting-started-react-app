import React from "react";
import { Link, useLocation } from "react-router-dom";

type BreadcrumbItem = {
  label: string;
  href: string;
};

const formatLabel = (segment: string) => {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  if (!pathname || pathname === "/") {
    return [{ label: "Home", href: "/" }];
  }

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  let cumulativePath = "";
  segments.forEach((segment) => {
    cumulativePath += `/${segment}`;
    breadcrumbs.push({
      label: formatLabel(segment),
      href: cumulativePath,
    });
  });

  return breadcrumbs;
};

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <ol className="breadcrumb-list">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={item.href} className="breadcrumb-item">
              {isLast ? (
                <span className="breadcrumb-current">{item.label}</span>
              ) : (
                <>
                  <Link to={item.href} className="breadcrumb-link">
                    {item.label}
                  </Link>
                  <span className="breadcrumb-separator">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
