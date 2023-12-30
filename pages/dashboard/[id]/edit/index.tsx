import BoardEditLayout from '@/page-layout/BoardEditLayout';
import {
  ArrowBackButton,
  Button,
  DashboardHeader,
  DashboardSidebar,
  InviteListTable,
  MembersTable,
  NameEditForm,
} from '@/components';
import React from 'react';
import useGetDashboard from '@/components/boardEdit/data/useGetDashboard';
import { useRouter } from 'next/router';
import Link from 'next/link';
import DeleteDashboardConfirmModal from '@/components/boardEdit/DeleteDashboardConfirmModal';
import useToggle from '@/hooks/useToggle';
import BoardEditMain from '@/components/boardEdit/BoardEditMain';
import DashboardLayout from '@/page-layout/DashboardLayout';
import { useDashboardList } from '@/store/memos/useDashboardList';
import { Dashboards } from '@/types/dashboards';

function BoardEditPage() {
  const router = useRouter();
  const params = router.query;
  const boardid = params?.id ? Number(params.id) : null;
  if (boardid === null || isNaN(boardid)) return;

  const { dashboardList } = useDashboardList();

  const currentId = router.query['id'] as string | undefined;

  let dashboard: Dashboards | undefined;
  if (dashboardList) {
    dashboard = dashboardList.find((dashboard) => {
      return String(dashboard?.id) === currentId;
    });
  }

  if (!dashboard) return;

  return (
    <DashboardLayout
      main={<BoardEditMain boardid={boardid} />}
      header={<DashboardHeader dashboard={dashboard} />}
      sidebar={
        <DashboardSidebar currentId={currentId} dashboardList={dashboardList} />
      }
    />
  );
}

export default BoardEditPage;
