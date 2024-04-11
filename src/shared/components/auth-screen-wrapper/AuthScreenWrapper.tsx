import * as React from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Link} from 'expo-router';
/**
 * ? Local & Shared Imports
 */
import createStyles from './AuthScreenWrapper.styles';

import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import FitFamLogo from '@resources/images/fitfamlogogrey.svg';

import {iOS} from '@shared-constants/app-config';

type AuthScreenWrapperProps = {
	title: string;
	subtitle: string;
	displayTerms?: boolean;
	screen: 'login' | 'register';
} & React.PropsWithChildren;

export const AuthScreenWrapper: React.FC<AuthScreenWrapperProps> = ({
	children,
	title,
	subtitle,
	displayTerms = true,
	screen,
}) => {
	const theme = useTheme();
	const {colors} = theme;
	const styles = React.useMemo(() => createStyles(theme), [theme]);

	const navigateText =
		screen === 'login' ? "Don't have an account?" : 'Already have an account?';
	const navigateTo = screen === 'login' ? '/sign-up' : '/sign-in';
	const label = screen === 'login' ? 'Register' : 'Login';

	return (
		<KeyboardAvoidingView
			style={{flex: 1}}
			behavior={iOS ? 'padding' : 'height'}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.root}>
					<View style={styles.container}>
						<Text
							fontFamily='DMSansSemiBold'
							color={colors.primary}
							style={styles.title}
						>
							{title}
						</Text>
						<Text
							fontFamily='DMSansMedium'
							color={colors.grey3}
							style={styles.subtitle}
						>
							{subtitle}
						</Text>

						{children}
						<View style={styles.footer}>
							<View style={styles.footerTop}>
								<Text
									h4
									center
									fontFamily='DMSansMedium'
									style={styles.terms}
									color={colors.grey3}
								>
									{navigateText}
								</Text>
								<Separator width={6} />
								<Link href={navigateTo}>
									<Text
										h4
										accessibilityLabel={`Navigate to ${label}`}
										color={colors.primary}
										center
										fontFamily='DMSansBold'
										style={[styles.terms, styles.footerTopText]}
									>
										{label}
									</Text>
								</Link>
							</View>

							{displayTerms && (
								<>
									<Text
										center
										fontFamily='DMSansMedium'
										style={styles.terms}
										color={colors.grey3}
									>
										By Continuing, you agree to{' '}
										<Text color={colors.grey1} fontFamily='DMSansSemiBold'>
											FITFAM&apos;s
										</Text>
									</Text>
									<Text
										color={colors.primary}
										center
										fontFamily='DMSansBold'
										style={styles.terms}
									>
										Terms and Agreement
									</Text>
								</>
							)}
						</View>
					</View>
					<View style={styles.logoFooter}>
						<FitFamLogo />
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};
