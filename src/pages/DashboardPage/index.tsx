import CommonDateMultiField from '@/components/inputs/CommonDateMultiField';
import withSelectedDateTags from '@/components/inputs/CommonDateMultiField/hocs/withSelectedDateTags';
import Box from '@mui/material/Box';
import type { Moment } from 'moment';
import React, { useState } from 'react';

const CommonDateMultiWithTagsField = withSelectedDateTags(CommonDateMultiField);

const DashboardPage: React.FC<any> = (props) => {
  const [dates, setDates] = useState<Moment[]>([]);

  return (
    <Box sx={{ m: 0, p: 0 }}>
      <CommonDateMultiWithTagsField
        value={dates}
        onChange={(val) => {
          setDates(val || []);
        }}
      />
    </Box>
  );
};
export default DashboardPage;
