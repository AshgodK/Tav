// PDFContent.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';



const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        border: '1pt solid #000000',
        borderRadius: '5pt',
        boxShadow: '3pt 3pt 3pt #888888',
        textAlign: 'center',
        backgroundColor: '#F0F0F0'
    },
    header: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    label: {
        fontSize: 8,
        fontWeight: 'bold',
        marginBottom: 4,
        textTransform: 'uppercase'
    },
    value: {
        fontSize: 10,
        marginBottom: 8
    },
    photo: {
        width: 70,
        height: 70,
        marginLeft: 50,
        marginBottom: 25
    }
});


const PDFContent = ({ permi }) => (
    <Document>
        <Page size="A7" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Identity Card</Text>

                <View style={styles.contentContainer}>
                    <Image
                        src={process.env.PUBLIC_URL + '/images/' + permi.image}
                        style={styles.photo}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.label}> firstName:  <Text style={styles.value}>{permi.firstname}</Text></Text>

                        <Text style={styles.label}>lastName: <Text style={styles.value}>{permi.lastname}</Text></Text>

                        <Text style={styles.label}>cin: <Text style={styles.value}>{permi.cin}</Text></Text>
                        <Text style={styles.label}>numero: <Text style={styles.value}>{permi.num}</Text></Text>
                        <Text style={styles.label}>validite: <Text style={styles.value}>  {new Date(permi.validite).toLocaleDateString('en-GB')}</Text></Text>

                        <Text style={styles.label}>fonction: <Text style={styles.value}>{permi.fonction}</Text></Text>
                        <Text style={styles.label}>etablissement: <Text style={styles.value}>{permi.etablissement}</Text></Text>

                    </View>
                </View>

            </View>
        </Page>
    </Document>
);

export default PDFContent;
