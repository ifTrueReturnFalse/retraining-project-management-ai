import styles from './AccountPage.module.css'
import TextInput from '@/components/Inputs/TextInput/TextInput'
import Button from '@/components/Inputs/Button/Button'

export default function AccountPage() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Mon compte</h2>
      <p className={styles.user}>User</p>

      <TextInput label='Nom' placeholder='Dupont' />
      <TextInput label='Prénom' placeholder='Amélie' />
      <TextInput label='Email' placeholder='a.dupont@gmail.com' type='email' />
      <TextInput label='Mot de passe' placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;' type='password' />
      <Button textButton='Modifier les informations' />
    </section>
  )
}