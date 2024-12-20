import { StyleSheet, Text, View } from 'react-native'

export default function Setting() {
  const styles = makeStyles()

  return (
    <View style={styles.container}>
      <Text>Setting</Text>
    </View>
  )
}

const makeStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
