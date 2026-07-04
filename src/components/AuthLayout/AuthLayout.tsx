import type { ReactNode } from 'react'
import Grid from '@mui/material/Grid'
import ProgressBar from '../ProgressBar/ProgressBar'
import illustration from '../../assets/illustration.svg'
import topography from '../../assets/topography.png'
import styles from './AuthLayout.module.css'

interface AuthLayoutProps {
  progress?: number | null
  children: ReactNode
}

export default function AuthLayout({ progress = null, children }: AuthLayoutProps) {
  return (
    <main className={styles.page}>
      <Grid container className={styles.layout}>
        <Grid size={{ xs: 12, md: 6 }} className={styles.left}>
          <img src={topography} alt="" aria-hidden className={styles.topography} />
          <header className={styles.intro}>
            <p className={styles.eyebrow}>Let’s get started</p>
            <h1 className={styles.title}>Create your account</h1>
            <p className={styles.subtitle}>Follow the steps to create your account</p>
          </header>
          <img src={illustration} alt="" aria-hidden className={styles.illustration} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} className={styles.right}>
          <section className={styles.card}>
            {progress != null && (
              <div className={styles.progress_slot}>
                <ProgressBar value={progress} />
              </div>
            )}
            <div className={styles.card_body}>{children}</div>
          </section>
        </Grid>
      </Grid>
    </main>
  )
}
