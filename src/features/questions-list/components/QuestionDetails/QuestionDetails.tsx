import LaunchIcon from '@mui/icons-material/Launch'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Question } from '@/entities/question'
import { formatUnixSeconds } from '@/shared/lib'

interface QuestionDetailsProps {
  question: Question
}

const NOT_AVAILABLE = '—'

const Field = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Typography variant="caption" color="text.secondary" component="div">
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 600 }}>
      {value}
    </Typography>
  </Box>
)

export const QuestionDetails = ({ question }: QuestionDetailsProps) => (
  <Box sx={{ pt: 1.5 }}>
    <Divider sx={{ mb: 1.5 }} />

    <Box
      sx={{
        display: 'grid',
        gap: 1.5,
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
      }}
    >
      <Field label="Автор" value={question.owner.displayName} />
      <Field
        label="Репутация автора"
        value={question.owner.reputation?.toLocaleString('ru-RU') ?? NOT_AVAILABLE}
      />
      <Field label="Просмотров" value={question.viewCount.toLocaleString('ru-RU')} />
      <Field label="Последняя активность" value={formatUnixSeconds(question.lastActivityAt)} />
    </Box>

    <Stack direction="row" spacing={2} sx={{ mt: 1.5, alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Ответов: {question.answerCount}
      </Typography>
      <Link
        href={question.link}
        target="_blank"
        rel="noopener"
        variant="body2"
        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
        onClick={(event) => event.stopPropagation()}
      >
        Открыть на Stack Overflow
        <LaunchIcon sx={{ fontSize: 14 }} />
      </Link>
    </Stack>
  </Box>
)
