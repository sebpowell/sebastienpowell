const formatEngagementDate = ({
  start,
  end,
}: {
  start: number;
  end: number;
}) => {
  return start === end ? end : `${start}—${end}`;
};

export { formatEngagementDate };
