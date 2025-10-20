const formatEngagementDate = ({
  start,
  end,
}: {
  start: string;
  end: string | undefined;
}) => {
  const startYear = new Date(start).getFullYear();

  const endYear = end ? new Date(end).getFullYear() : undefined;

  const display =
    startYear === endYear
      ? endYear
      : endYear
        ? `${startYear} – ${endYear}`
        : `${startYear} – Present`;

  return display;
};

export { formatEngagementDate };
