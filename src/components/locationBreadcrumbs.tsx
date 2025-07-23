import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Breadcrumb } from "antd";
import { useAppLinkBuilder } from "hooks/useAppLinkBuilder";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { AppPath } from "components";
import { useContext } from "react";
import { AppLayoutContext } from "./layout";

interface LocationBreadcrumbsProps {
  breadcrumbEnd?: string;
}

const basebreadcrumbNameMap: Record<string, string> = {
  [AppPath.home]: "navigation.dashboard",
  [AppPath.brandProfile]: "navigation.brandProfile",
  [AppPath.userProfile]: "navigation.userProfile",
};

export function LocationBreadcrumbs({
  breadcrumbEnd,
}: LocationBreadcrumbsProps) {
  const { formatMessage } = useIntl();

  const { sidebarItems } = useContext(AppLayoutContext);

  const linkBuilder = useAppLinkBuilder();

  const location = useLocation();
  const pathSnippets = location.pathname
    .split("/")
    .filter((i) => i && i !== "" && i !== " ");

  const sidebarBreadcrumbNameMap = sidebarItems.reduce<Record<string, string>>(
    (prev, curr) => ({ ...prev, [curr.key || ""]: curr.title || "" }),
    {}
  );

  const allBreadcrumbNameMap = {
    ...basebreadcrumbNameMap,
    ...sidebarBreadcrumbNameMap,
  };

  const pathBreadcrumbItems: BreadcrumbItemType[] = pathSnippets.map(
    (_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return {
        key: url,
        title: (
          <Link to={linkBuilder(url)}>
            {allBreadcrumbNameMap[url]
              ? formatMessage({
                  id: allBreadcrumbNameMap[url],
                })
              : breadcrumbEnd}
          </Link>
        ),
        separator: index < pathSnippets.length ? "/" : "",
      };
    }
  );

  return <Breadcrumb items={pathBreadcrumbItems} />;
}

export default LocationBreadcrumbs;
